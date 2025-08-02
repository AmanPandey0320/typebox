package com.typebox.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.typebox.backend.entity.FileEntity;
import com.typebox.backend.pojo.SavedFile;
import com.typebox.backend.repository.FileRepository;


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
	 * @param file
	 * @return
	 */
	private String saveFile(MultipartFile file) {
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
	
	
	public List<SavedFile> uploadFile (MultipartFile[] files) {
		List<SavedFile> savedFiles = new ArrayList<>();
		
		for(MultipartFile file:files) {
			SavedFile f = new SavedFile();
			try {
				//save in local file
				String path = this.saveFile(file);
				
				//save to db
				FileEntity fileEntity = new FileEntity();
				
				fileEntity.setFilePath(path);
				fileEntity.setOwnerId("user");
				fileEntity.setName(StringUtils.cleanPath(file.getOriginalFilename()));
				
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

}
