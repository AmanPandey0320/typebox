package com.typebox.backend.util;

import org.springframework.stereotype.Component;

import com.typebox.backend.entity.FileEntity;

@Component
public class FileUtil {
	
	public static FileEntity getEntityFrom(String path,String user, String baseDir,String name,String type) {
		FileEntity fileEntity = new FileEntity();
		
		fileEntity.setFilePath(path);
		fileEntity.setOwnerId(user);
		fileEntity.setName(name);
		fileEntity.setParentDir(baseDir);
		fileEntity.setType(type);
		
		return fileEntity;
	}
}
