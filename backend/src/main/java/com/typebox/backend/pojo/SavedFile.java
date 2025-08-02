package com.typebox.backend.pojo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SavedFile {
	private String id;
	private String message;
	private String error;
}
