package com.typebox.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.typebox.backend.entity.FileEntity;

@Repository
public interface FileRepository extends CrudRepository<FileEntity,String> {
	
}
