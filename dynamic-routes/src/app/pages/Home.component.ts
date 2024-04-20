
    import { Component } from '@angular/core';
   
    import { Component1Component } from '../component1/component1.component';
import { Component2Component } from '../component2/component2.component';      

    @Component({
    selector: 'app-Home-page',
    standalone: true,
    imports: [Component1Component,Component2Component],
    template: `<app-component1></app-component1>
<app-component2></app-component2>`,
    })
    export class Home {}
    