import { Component, Input } from "@angular/core";

@Component({
    selector: "app-label",
    templateUrl: "./label.component.html",
    styleUrls: ["./label.component.scss"],
})
export class LabelComponent {
    @Input() ControlAccess: Object;
    @Input() mode: "edit" | "list";
    constructor() {}
}
