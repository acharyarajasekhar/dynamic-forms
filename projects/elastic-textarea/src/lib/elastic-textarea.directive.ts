import { HostListener, Directive, OnInit, ElementRef, Inject, Input } from '@angular/core';

@Directive({
    selector: 'textarea[elasticize]'
})
export class ElasticTextAreaDirective implements OnInit {

    @Input() min: number = 100;
    @Input() max: number = null;

    @HostListener('input', ['$event.target'])
    onInput(_textArea: HTMLTextAreaElement): void { setTimeout(() => this.adjust(), 10); }

    constructor(@Inject(ElementRef) public element: ElementRef) { setTimeout(() => this.adjust(), 10); }

    ngOnInit(): void { setTimeout(() => this.adjust(), 500); }

    adjust(): void {

        let textArea = this.element.nativeElement;

        if (!!textArea) {

            if (!!this.min) {
                textArea.style.height = 'auto';
                textArea.style.height = this.min + 'px';
            }

            textArea.style.height = textArea.scrollHeight + "px";

            if (!!this.max) {
                textArea.style.maxHeight = this.max + "px";
            }


        }
    }

}