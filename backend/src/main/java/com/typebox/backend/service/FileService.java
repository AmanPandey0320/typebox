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

import jakarta.annotation.PostConstruct;



@Service
public class FileService {
	
	private final Logger logger = LogManager.getLogger(FileService.class);

	private final Path fileStorageLocation;
	private FileRepository fileRepository;

	/**
	 * 
	 * @param fileRepository
	 * @param uploadDirectory
	 */
	public FileService(FileRepository fileRepository, @Value("${app.uploadPath}") String uploadDirectory) {
		super();
		this.fileRepository = fileRepository;
		this.fileStorageLocation = Paths.get(uploadDirectory).toAbsolutePath().normalize();
	}
	
	/**
	 * 
	 */
	@PostConstruct
	private void createBase() {
		if(fileRepository.findById("box").isPresent()) {
			return;
		}
		
		// create if not
		fileRepository.insertFileEntity(
				"box", 
				"Box", 
				fileStorageLocation.toAbsolutePath().toString(), 
				Constant.FileType.FOLDER, 
				"gray", 
				"user", 
				"box"
		);

	}

	/**
	 * 
	 * @param file
	 * @return
	 */
	private String saveToLocal(MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		
		logger.info("saving file: {}",fileName);

		try {
			// Check for invalid file paths
			if (fileName.contains("..")) {
				throw new RuntimeException("Filename contains invalid path sequence: " + fileName);
			}

			// resolve the target location
			Path targetLocation = this.fileStorageLocation.resolve(fileName);

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
	 * save file info to db
	 * @param path
	 * @param user
	 * @param baseDir
	 * @param name
	 * @return
	 */
	private String saveFileInfoToDb(String path,String user, String baseDir,String name,String type) {
		FileEntity fileEntity = new FileEntity();
		
		fileEntity.setFilePath(path);
		fileEntity.setOwnerId(user);
		fileEntity.setName(name);
		fileEntity.setParentDir(baseDir);
		fileEntity.setType(type);
		
		fileEntity = this.fileRepository.save(fileEntity);
		
		return fileEntity.getId();
	}
	
	/**
	 * save file in local directory and save location in db
	 * @param files
	 * @return
	 */
	public List<SavedFile> uploadFile (MultipartFile[] files,String baseDir) {
		List<SavedFile> savedFiles = new ArrayList<>();
		
		for(MultipartFile file:files) {
			SavedFile f = new SavedFile();
			try {
				//save in local file
				String path = this.saveToLocal(file);
				
				//save to db
				String id = this.saveFileInfoToDb(
						path, 
						"user", 
						baseDir, 
						StringUtils.cleanPath(file.getOriginalFilename()),
						Constant.FileType.FILE
				);
				
				f.setId(id);
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
     * @param folderName
     * @param baseDir
     * @return id of created folder
     */
    public String createFolderInStorageLocation(String folderName,String baseDir) {
    	FileEntity baseFolder = fileRepository.findById(baseDir)
    			.orElseThrow(() -> new RuntimeException("Folder not found with id " + baseDir));
        try {
            // Normalize and resolve the folder path inside the base storage location
            Path folderPath = Paths.get(baseFolder.getFilePath()).normalize().resolve(folderName).normalize();

            // Create the directory including any nonexistent parent directories
            Files.createDirectories(folderPath);
            
            return this.saveFileInfoToDb(
            		folderPath.toString().toString(), 
            		"user", 
            		baseDir, 
            		folderName,
            		Constant.FileType.FOLDER
            );

        } catch (IOException e) {
            throw new RuntimeException("Could not create directory '" + folderName + "' in " + fileStorageLocation, e);
        }
    }

}
