'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ng-gallery-project documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/GalleryModule.html" data-type="entity-link" >GalleryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GalleryModule-90f9d1f7efe4d47d235a2518dd69bdc5f50065fdc02b9aa3ebc79e364b001092de31ebe30487e7678eb04ad320c7ad562149c0fa066e2545945bf214e26ec8ed"' : 'data-target="#xs-components-links-module-GalleryModule-90f9d1f7efe4d47d235a2518dd69bdc5f50065fdc02b9aa3ebc79e364b001092de31ebe30487e7678eb04ad320c7ad562149c0fa066e2545945bf214e26ec8ed"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GalleryModule-90f9d1f7efe4d47d235a2518dd69bdc5f50065fdc02b9aa3ebc79e364b001092de31ebe30487e7678eb04ad320c7ad562149c0fa066e2545945bf214e26ec8ed"' :
                                            'id="xs-components-links-module-GalleryModule-90f9d1f7efe4d47d235a2518dd69bdc5f50065fdc02b9aa3ebc79e364b001092de31ebe30487e7678eb04ad320c7ad562149c0fa066e2545945bf214e26ec8ed"' }>
                                            <li class="link">
                                                <a href="components/GalleryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GalleryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-GalleryModule-90f9d1f7efe4d47d235a2518dd69bdc5f50065fdc02b9aa3ebc79e364b001092de31ebe30487e7678eb04ad320c7ad562149c0fa066e2545945bf214e26ec8ed"' : 'data-target="#xs-directives-links-module-GalleryModule-90f9d1f7efe4d47d235a2518dd69bdc5f50065fdc02b9aa3ebc79e364b001092de31ebe30487e7678eb04ad320c7ad562149c0fa066e2545945bf214e26ec8ed"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-GalleryModule-90f9d1f7efe4d47d235a2518dd69bdc5f50065fdc02b9aa3ebc79e364b001092de31ebe30487e7678eb04ad320c7ad562149c0fa066e2545945bf214e26ec8ed"' :
                                        'id="xs-directives-links-module-GalleryModule-90f9d1f7efe4d47d235a2518dd69bdc5f50065fdc02b9aa3ebc79e364b001092de31ebe30487e7678eb04ad320c7ad562149c0fa066e2545945bf214e26ec8ed"' }>
                                        <li class="link">
                                            <a href="directives/GalleryBoxDef.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GalleryBoxDef</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/GalleryImageDef.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GalleryImageDef</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/GalleryItemDef.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GalleryItemDef</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/GalleryThumbDef.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GalleryThumbDef</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LightboxModule.html" data-type="entity-link" >LightboxModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-LightboxModule-499a1910b09e24ca1178f4c4109853cfd404301e4511b9f542d21e3640dded00d786689815090f72a1afe1c6b6193a0bd7ecca4430e02e317142b0914b106317"' : 'data-target="#xs-directives-links-module-LightboxModule-499a1910b09e24ca1178f4c4109853cfd404301e4511b9f542d21e3640dded00d786689815090f72a1afe1c6b6193a0bd7ecca4430e02e317142b0914b106317"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-LightboxModule-499a1910b09e24ca1178f4c4109853cfd404301e4511b9f542d21e3640dded00d786689815090f72a1afe1c6b6193a0bd7ecca4430e02e317142b0914b106317"' :
                                        'id="xs-directives-links-module-LightboxModule-499a1910b09e24ca1178f4c4109853cfd404301e4511b9f542d21e3640dded00d786689815090f72a1afe1c6b6193a0bd7ecca4430e02e317142b0914b106317"' }>
                                        <li class="link">
                                            <a href="directives/GallerizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GallerizeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/LightboxDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LightboxDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/CustomTemplateComponent.html" data-type="entity-link" >CustomTemplateComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryComponent.html" data-type="entity-link" >GalleryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryCoreComponent.html" data-type="entity-link" >GalleryCoreComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryCounterComponent.html" data-type="entity-link" >GalleryCounterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryDotsComponent.html" data-type="entity-link" >GalleryDotsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryExampleComponent.html" data-type="entity-link" >GalleryExampleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryIframeComponent.html" data-type="entity-link" >GalleryIframeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryImageComponent.html" data-type="entity-link" >GalleryImageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryItemComponent.html" data-type="entity-link" >GalleryItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryNavComponent.html" data-type="entity-link" >GalleryNavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GallerySliderComponent.html" data-type="entity-link" >GallerySliderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryThumbComponent.html" data-type="entity-link" >GalleryThumbComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryThumbsComponent.html" data-type="entity-link" >GalleryThumbsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryVideoComponent.html" data-type="entity-link" >GalleryVideoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LightboxComponent.html" data-type="entity-link" >LightboxComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LightboxExampleComponent.html" data-type="entity-link" >LightboxExampleComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#directives-links"' :
                                'data-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/AutoplayDirective.html" data-type="entity-link" >AutoplayDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/GallerizeDirective.html" data-type="entity-link" >GallerizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/GalleryBoxDef.html" data-type="entity-link" >GalleryBoxDef</a>
                                </li>
                                <li class="link">
                                    <a href="directives/GalleryImageDef.html" data-type="entity-link" >GalleryImageDef</a>
                                </li>
                                <li class="link">
                                    <a href="directives/GalleryItemDef.html" data-type="entity-link" >GalleryItemDef</a>
                                </li>
                                <li class="link">
                                    <a href="directives/GalleryThumbDef.html" data-type="entity-link" >GalleryThumbDef</a>
                                </li>
                                <li class="link">
                                    <a href="directives/HammerSliding.html" data-type="entity-link" >HammerSliding</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ImgRecognizer.html" data-type="entity-link" >ImgRecognizer</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ItemIntersectionObserver.html" data-type="entity-link" >ItemIntersectionObserver</a>
                                </li>
                                <li class="link">
                                    <a href="directives/LightboxDirective.html" data-type="entity-link" >LightboxDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/SliderIntersectionObserver.html" data-type="entity-link" >SliderIntersectionObserver</a>
                                </li>
                                <li class="link">
                                    <a href="directives/SliderResizeObserver.html" data-type="entity-link" >SliderResizeObserver</a>
                                </li>
                                <li class="link">
                                    <a href="directives/SmoothScroll.html" data-type="entity-link" >SmoothScroll</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ThumbResizeObserver.html" data-type="entity-link" >ThumbResizeObserver</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ActiveItemObserver.html" data-type="entity-link" >ActiveItemObserver</a>
                            </li>
                            <li class="link">
                                <a href="classes/GalleryRef.html" data-type="entity-link" >GalleryRef</a>
                            </li>
                            <li class="link">
                                <a href="classes/HorizontalAdapter.html" data-type="entity-link" >HorizontalAdapter</a>
                            </li>
                            <li class="link">
                                <a href="classes/IframeItem.html" data-type="entity-link" >IframeItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageItem.html" data-type="entity-link" >ImageItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/SliderAdapter.html" data-type="entity-link" >SliderAdapter</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerticalAdapter.html" data-type="entity-link" >VerticalAdapter</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoItem.html" data-type="entity-link" >VideoItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/YoutubeItem.html" data-type="entity-link" >YoutubeItem</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/Gallery.html" data-type="entity-link" >Gallery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImgManager.html" data-type="entity-link" >ImgManager</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Lightbox.html" data-type="entity-link" >Lightbox</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Pixabay.html" data-type="entity-link" >Pixabay</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BezierEasingOptions.html" data-type="entity-link" >BezierEasingOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GalleryConfig.html" data-type="entity-link" >GalleryConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GalleryError.html" data-type="entity-link" >GalleryError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GalleryItem.html" data-type="entity-link" >GalleryItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GalleryItemContext.html" data-type="entity-link" >GalleryItemContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GalleryState.html" data-type="entity-link" >GalleryState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GalleryStateContext.html" data-type="entity-link" >GalleryStateContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Hit.html" data-type="entity-link" >Hit</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Hit2.html" data-type="entity-link" >Hit2</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImageRegistry.html" data-type="entity-link" >ImageRegistry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LightboxConfig.html" data-type="entity-link" >LightboxConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PixabayHDModel.html" data-type="entity-link" >PixabayHDModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PixabayModel.html" data-type="entity-link" >PixabayModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SliderState.html" data-type="entity-link" >SliderState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SmoothScrollOptions.html" data-type="entity-link" >SmoothScrollOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SmoothScrollStep.html" data-type="entity-link" >SmoothScrollStep</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkerState.html" data-type="entity-link" >WorkerState</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});