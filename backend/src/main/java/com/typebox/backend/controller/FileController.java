package com.typebox.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.typebox.backend.pojo.SavedFile;
import com.typebox.backend.service.FileService;
import com.typebox.backend.util.ResponseHandler;

@RestController
@RequestMapping("/api/v1/file")
public class FileController {
	
	@Autowired
	private FileService fileService;
	
	
	@PostMapping("/upload")
	public ResponseEntity<?> uploadFile(@RequestParam("files") MultipartFile[] files){
		
		try {
			List<SavedFile> savedFiles = this.fileService.uploadFile(files);
			
			return new ResponseHandler()
					.status(HttpStatus.OK)
					.data(savedFiles)
					.build();
			
		}catch(Exception e) {
			return new ResponseHandler()
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.error(List.of(e.getLocalizedMessage()))
					.build();
		}
		
	}
	
	@GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable("id") String id) {
        Resource resource = fileService.loadFileAsResource(id);

        // Set default content type or try to derive from file extension if needed
        String contentType = "application/octet-stream";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, 
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
