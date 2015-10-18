package com.adheris.controllers;

import java.io.File;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.adheris.model.Organization;

@RestController
public class OrganizationController {

	@RequestMapping(value = "/organization", method = RequestMethod.GET)
	public ResponseEntity<Organization> getOrganization() {
		try {
			JAXBContext context = JAXBContext.newInstance(Organization.class);
			Unmarshaller unmarshaller = context.createUnmarshaller();
			Organization org = (Organization) unmarshaller.unmarshal(new File ("config.xml"));
			return new ResponseEntity<Organization>(org, HttpStatus.OK);
		}catch(Exception ex) {
			ex.printStackTrace();
			return new ResponseEntity (ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
