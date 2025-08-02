package com.typebox.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}
