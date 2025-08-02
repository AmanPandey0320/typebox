package com.typebox.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.typebox.backend.entity.FileEntity;
import com.typebox.backend.repository.FileRepository;
import com.typebox.backend.util.Constant;
import com.typebox.backend.util.FileUtil;

import jakarta.annotation.PostConstruct;

@Service
public class FolderService {
	
	private final Logger logger = LogManager.getLogger(FolderService.class);

	private final Path fileStorageLocation;
	private FileRepository fileRepository;
	
	/**
	 * 
	 * @param fileRepository
	 * @param uploadDirectory
	 */
	public FolderService(FileRepository fileRepository, @Value("${app.uploadPath}") String uploadDirectory) {
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
				"root"
		);

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
            
            FileEntity fileEntity = FileUtil.getEntityFrom(
            		folderPath.toString().toString(), 
            		"user", // TODO: change in authn
            		baseDir, 
            		folderName,
            		Constant.FileType.FOLDER
            );
			
			fileEntity = this.fileRepository.save(fileEntity);
            
            return fileEntity.getId();

        } catch (IOException e) {
            throw new RuntimeException("Could not create directory '" + folderName + "' in " + fileStorageLocation, e);
        }
    }
    
    public List<FileEntity> ls(String dir){
    	List<FileEntity> files = this.fileRepository.findByParentDir(dir);
    	
    	return files;
    }
    
    
    public String[] getBaseToFileRoute(String path){
    	Path targetPath = Paths.get(path);
    	String relativePath = this.fileStorageLocation.relativize(targetPath).toString();
    	
    	return relativePath.toString().split("[/\\\\]");
    }
    
    

}
