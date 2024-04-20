
    import { Component } from '@angular/core';
   
    import { Component2Component } from '../component2/component2.component';      

    @Component({
    selector: 'app-About-page',
    standalone: true,
    imports: [Component2Component],
    template: `<app-component2></app-component2>`,
    })
    export class About {}
    