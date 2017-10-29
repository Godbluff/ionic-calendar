import { NgModule } from '@angular/core';
import { DoorComponent } from './door/door';
import { ModalsComponent } from './modals/modals';
@NgModule({
	declarations: [DoorComponent,
    ModalsComponent],
	imports: [],
	exports: [DoorComponent,
    ModalsComponent]
})
export class ComponentsModule {}
