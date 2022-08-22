import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn: string = "Save"

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      website: ["", Validators.required],
      company: ["", Validators.required],
    })

    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls["name"].setValue(this.editData.name);
      this.productForm.controls["username"].setValue(this.editData.username);
      this.productForm.controls["email"].setValue(this.editData.email);
      this.productForm.controls["phone"].setValue(this.editData.phone);
      this.productForm.controls["website"].setValue(this.editData.website);
      this.productForm.controls["company"].setValue(this.editData.company.name);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            this.openSnackBar("Product added successfully", "OK")
            this.productForm.reset();
            this.dialogRef.close("save");
          },
          error: () => {
            alert("Error while adding the product")
          }
        })
      }
    } else {
      this.updateProduct()
    }
  }

  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.openSnackBar("Product updated successfully", "OK")
          this.productForm.reset()
          this.dialogRef.close("update")
        },
        error: () => {
          alert("Error while updating the record!!")
        }
      })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
