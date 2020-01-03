import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

import { ArtObjectType } from "../../models/art-object-type.enum";

@Component({
  selector: 'app-add-object-form',
  templateUrl: './add-object-form.component.html',
  styleUrls: ['./add-object-form.component.less']
})
export class AddObjectFormComponent implements OnInit {

  addObjectForm: FormGroup;

  types: any = [
    {type: ArtObjectType.Graffiti, name: 'Граффити'},
    {type: ArtObjectType.Monument, name: 'Памятник'},
    {type: ArtObjectType.Installation, name: 'Инсталляция'},
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddObjectFormComponent>
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.addObjectForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      type: [
        '',
        Validators.required
      ],
      description: [
        ''
      ],
      longitude: [
        '',
        Validators.required
      ],
      latitude: [
        '',
        Validators.required
      ]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  add(): void  {
    this.dialogRef.close();
  }
}
