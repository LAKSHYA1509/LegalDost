package com.legalDost.forms;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class GpaForm {

    private String PrincipleFullName;

    private String PrincipleAddress;

    private String AttorneyFullName;

    private String AttorneyAddress;

    private String WitnessFullName;

    private String WitnessAddress;
    
    private String DateOfExecution;
}
