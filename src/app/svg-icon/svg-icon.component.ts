import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.css']
})
export class SvgIconComponent  implements OnInit{
  @Input() svgName: string;
  @Input() svgURL: string;
  @Input() svgLabel?: string;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.iconRegistry.addSvgIcon(this.svgName, this.sanitizer.bypassSecurityTrustResourceUrl(this.svgURL));
  }
}
