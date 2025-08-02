package com.typebox.backend.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.typebox.backend.entity.FileEntity;
import com.typebox.backend.pojo.SavedFile;
import com.typebox.backend.repository.FileRepository;
import com.typebox.backend.util.Constant;
import com.typebox.backend.util.FileUtil;

import jakarta.annotation.PostConstruct;



@Service
public class FileService {
	
	private final Logger logger = LogManager.getLogger(FileService.class);

	private FileRepository fileRepository;

	/**
	 * 
	 * @param fileRepository
	 * @param uploadDirectory
	 */
	public FileService(FileRepository fileRepository) {
		super();
		this.fileRepository = fileRepository;
	}

	/**
	 * 
	 * @param file
	 * @return
	 */
	private String saveToLocal(MultipartFile file,String destFolder) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		
		logger.info("saving file: {}",fileName);

		try {
			// Check for invalid file paths
			if (fileName.contains("..")) {
				throw new RuntimeException("Filename contains invalid path sequence: " + fileName);
			}

			// resolve the target location
			Path targetLocation = Paths.get(destFolder).normalize().resolve(fileName);

			// copy files
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
			

			return targetLocation.toAbsolutePath().toString();

		} catch (IOException ex) {
			logger.error("Exception while saving file: {}",ex.getMessage());
			logger.debug(ex.getStackTrace());
			throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
		}
	}
	
	/**
	 * save file in local directory and save location in db
	 * @param files
	 * @return
	 */
	public List<SavedFile> uploadFile (MultipartFile[] files,String baseDir) {
		FileEntity baseFolder = fileRepository.findById(baseDir)
    			.orElseThrow(() -> new RuntimeException("Folder not found with id " + baseDir));
		
		List<SavedFile> savedFiles = new ArrayList<>();
		
		for(MultipartFile file:files) {
			SavedFile f = new SavedFile();
			try {
				//save in local file
				String path = this.saveToLocal(file,baseFolder.getFilePath());
				
				//save to db
				FileEntity fileEntity = FileUtil.getEntityFrom(
						path, 
						"user", // TODO: to be changes when authn/authz in implemented
						baseDir, 
						StringUtils.cleanPath(file.getOriginalFilename()),
						Constant.FileType.FILE
				);
				
				fileEntity = this.fileRepository.save(fileEntity);
				
				f.setId(fileEntity.getId());
			}catch(Exception e) {
				f.setId(null);
				f.setError(e.getLocalizedMessage());
			}
			savedFiles.add(f);
		}
		
		return savedFiles;
	}
	
	
	/**
     * Load file as a Resource by file ID (UUID string)
     * 
     * @param fileId UUID string of the file entity
     * @return Resource
     */
    public Resource loadFileAsResource(String fileId) {
        // Fetch file metadata from DB
        FileEntity fileEntity = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found with id " + fileId));

        try {
            Path filePath = Paths.get(fileEntity.getFilePath()).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("File not found or not readable: " + fileEntity.getName());
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File path is invalid: " + fileEntity.getFilePath(), ex);
        }
    }
    
    /**
     * 
     * @param id
     * @return
     */
    public FileEntity getFileDetails(String id) {
    	FileEntity fileEntity = fileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found with id " + id));
    	
    	return fileEntity;
    }

}
