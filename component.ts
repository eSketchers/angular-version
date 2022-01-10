@Directive({ … })
export class myDirective { 
  /*
  * Creates an instance.
  */
    constructor(private viewContainerRef: 
						ViewContainerRef,
                private componentFactoryResolver: 
                        ComponentFactoryResolver) {}
    createMyComponent() {   
        const componentFactory = this.componentFactoryResolver.
                             resolveComponentFactory(myComponent);
    
        this.viewContainerRef.createComponent(componentFactory);
    }
}