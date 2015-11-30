package com.adheris.model;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="config")
@XmlAccessorType(XmlAccessType.FIELD)
public class Config {

	@XmlElement(required = true, name="organization")
	List<Organization> organizationList;

	public List<Organization> getOrganizationList() {
		return organizationList;
	}

	public void setOrganizationList(List<Organization> organizationList) {
		this.organizationList = organizationList;
	}

	public void addOrganization(Organization org) {
		this.organizationList.add(org);
	}
	
}
