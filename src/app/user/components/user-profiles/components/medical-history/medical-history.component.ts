import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss'],
})
export class MedicalHistoryComponent implements OnInit {
  MedicalHistoryMode = MedicalHistoryMode;
  mode: MedicalHistoryMode = MedicalHistoryMode.ADD;

  medicalHistoryList = [];

  constructor() {}

  ngOnInit(): void {}
}

enum MedicalHistoryMode {
  VIEW = 'VIEW',
  ADD = 'add',
  EDIT = 'edit',
  GRAPH = 'graph',
}
