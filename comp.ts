import { AfterViewInit, Component, ElementRef, Input, ViewChild ,forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Quill from 'quill';

const QUILL_EDITOR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => QuillLibraryComponent),
  multi: true
};


@Component({
  selector: 'infy-quill-angular',
  template: `
    <div #quillEditor></div>
    
  `,
  styles: [
  ],
  providers: [QUILL_EDITOR_VALUE_ACCESSOR]
})
export class QuillLibraryComponent implements AfterViewInit, ControlValueAccessor {

writeValue(value: any): void {
    if (this.quill) {
      this.quill.root.innerHTML = value;
    }
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(_: any): void {}

  setDisabledState(isDisabled: boolean): void {
    if (this.quill) {
      this.quill.enable(!isDisabled);
    }
  }



  @ViewChild('quillEditor', { static: false }) quillEditorRef!: ElementRef<HTMLTextAreaElement>;
@Input() textChange: any;
@Input() selectionChange: any;
@Input() editorChange: any;
@Input() onceSelectionChange: any;
@Input() onceEditorChange: any;
@Input() onceTextChange: any;
@Input() toolbaroptions: any;
@Input() set turnOffTextChangeHandler(value: boolean){
  if(value && this.quill){
       this.quill.off('text-change', this.textChange);
  }
  if(!value && this.quill){
    this.quill.on('text-change', this.textChange);
  }

};

@Input() set turnOffSelectionChangeHandler(value: boolean){
  if(value && this.quill){
       this.quill.off('selection-change', this.selectionChange);
  }
  if(!value && this.quill){
    this.quill.on('selection-change', this.selectionChange);
  }

};
@Input() set turnOffEditorChangeHandler(value: boolean){
  if(value && this.quill){
       this.quill.off('editor-change', this.editorChange);
  }
  if(!value && this.quill){
    this.quill.on('editor-change', this.editorChange);
  }

};

quill: Quill | undefined;
private onChange!: (value: string) => void;
private onTouched: any = () => {};
@Input() disabled: boolean = false;
@Input() content: string = '';
  ngAfterViewInit() {
    this.quill = new Quill(this.quillEditorRef.nativeElement, {
      modules:{
         toolbar: this.toolbaroptions,
      },
    theme: 'snow'
  });
       this.quill.on('text-change', this.textChange);
       this.quill.on('selection-change', this.selectionChange);
       this.quill.on('editor-change', this.editorChange);
       this.quill.once('text-change', this.onceTextChange);
       this.quill.once('selection-change', this.onceSelectionChange);
       this.quill.once('editor-change', this.onceEditorChange);

       this.quill.on('text-change', () => {
        const editorContent = this.quill!.getText();
      this.content = editorContent;
      this.onChange(editorContent);
      this.onTouched();
    });
  }
  }


