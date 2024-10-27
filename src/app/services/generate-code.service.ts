import { Injectable } from '@angular/core';
import { MetaData } from './meta-data.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateCodeService {

  constructor() { }

  generateHtmlFromJson(json: string): string {
    // First, build the hierarchy by assigning children to containers/forms
    const structuredJson = this.buildHierarchy(JSON.parse(json));
    console.log("structuredJson", structuredJson);
    // Then, generate the HTML from the structured JSON
    let htmlCode = '';
    structuredJson.forEach(element => {
      htmlCode += this.createElement(element, { top: 0, left: 0 });
    });

    console.log("htmlCode", htmlCode);

    return htmlCode;
  }

  private buildHierarchy(json: any[]): any[] {
    const containers = json.filter(el => el.type === 'container' || el.type === 'form');
    const otherElements = json.filter(el => !(el.type === 'container' || el.type === 'form'));

    otherElements.forEach(element => {
      let closestContainer: any = null;
      let minimalDifference = Infinity;

      containers.forEach(container => {
        if (this.isInsideContainer(element, container)) {
          const difference = this.calculateDifference(element, container);
          if (difference < minimalDifference) {
            minimalDifference = difference;
            closestContainer = container;
          }
        }
      });

      if (closestContainer) {
        closestContainer.children.push(element);
      } else {
        json.push(element);
      }
    });

    // Ensure that containers themselves are nested correctly
    let parentContainer: any = null;
    containers.forEach((container, index) => {
      parentContainer = null;
      let minimalDifference = Infinity;

      containers.forEach((potentialParent, parentIndex) => {
        if (parentIndex !== index && this.isInsideContainer(container, potentialParent)) {
          const difference = this.calculateDifference(container, potentialParent);
          if (difference < minimalDifference) {
            minimalDifference = difference;
            parentContainer = potentialParent;
          }
        }
      });

      if (parentContainer) {
        parentContainer.children.push(container);
      } else {
        json.push(container);
      }
    });

    return [parentContainer];
  }

  private isInsideContainer(element: any, container: any): boolean {
    const isInsideTop = element.style.top >= container.style.top;
    const isInsideBottom = (element.style.top + element.style.height) <= (container.style.top + container.style.height);
    const isInsideLeft = element.style.left >= container.style.left;
    const isInsideRight = (element.style.left + element.style.width) <= (container.style.left + container.style.width);

    return isInsideTop && isInsideBottom && isInsideLeft && isInsideRight;
  }

  private calculateDifference(element: any, container: any): number {
    const topDiff = Math.abs(element.style.top - container.style.top);
    const leftDiff = Math.abs(element.style.left - container.style.left);
    const rightDiff = Math.abs((container.style.left + container.style.width) - (element.style.left + element.style.width));
    const bottomDiff = Math.abs((container.style.top + container.style.height) - (element.style.top + element.style.height));

    return topDiff + leftDiff + rightDiff + bottomDiff;
  }

  private createElement(element: any, parentOffset: { top: number, left: number }): string {
    const styles = this.getStyleString(element, parentOffset);
    let childrenHtml = '';

    if ((element.type === 'container' || element.type === 'form') && element.children?.length > 0) {
      const childOffset = {
        top: parentOffset.top + element.style.top,
        left: parentOffset.left + element.style.left
      };

      element.children.forEach(child => {
        childrenHtml += this.createElement(child, childOffset);
      });

      if (this.checkIfFlexNeeded(element.children)) {
        childrenHtml = `<div style="display: flex;">${childrenHtml}</div>`;
      }
    }

    return this.getElement(element, styles, childrenHtml);
  }

  private getStyleString(element: any, parentOffset: { top: number, left: number }): string {
    const positionTop = element.style.top - parentOffset.top;
    const positionLeft = element.style.left - parentOffset.left;

    let styleMap = {
      'position': 'relative',
      'top': `${positionTop}px`,
      'left': `${positionLeft}px`,
      'width': `${element.type == "vrLine" ? 2 : element.style.width}px`,
      'height': `${element.type == "hrLine" ? 2 : element.style.height}px`,
    };

    if (element.style.backGroundColorType == 'Line Gradient') {
      styleMap['background-image'] = `linear-gradient(${element.style.linearGradientDirection},${element.style.fromBackgroundColor},${element.style.toBackgroundColor})`
    } else {
      styleMap['background-color'] = element.style.backGroundColor
    }

    if (element.type != "iframe" && element.type != "image") {
      if (element.type != "hrLine" && element.type != "vrLine") {
        styleMap['font-size'] = `${element.style.fontSize}px`;
        styleMap['color'] = element.style.textColor;
      }
      styleMap['border-width'] = `${element.style.borderWidth}px`;
      styleMap['border-color'] = element.style.borderColor;
      styleMap['border-radius'] = element.style.borderRadius;
    }


    return Object.keys(styleMap)
      .filter(key => styleMap[key] !== null)
      .map(key => `${key}: ${styleMap[key]};`)
      .join(' ');
  }

  private checkIfFlexNeeded(children: any[]): boolean {
    if (children.length < 2) return false;

    const firstWidth = children[0].style.width;

    return children.every(child => child.style.width === firstWidth);
  }

  private getElement(element: MetaData, styles: string, childrenHtml: any) {
    let htmlElement = "";
    switch (element.type) {
      case 'container':
        htmlElement = `
            <div id="${element.id}" style="${styles}">
              ${childrenHtml}
            </div>`;
        break;
      case 'form':
        htmlElement = `
            <form id="${element.id}" style="${styles}">
              ${childrenHtml}
            </form>`;
        break;
      case 'grid':
        htmlElement = `
            <div id="${element.id}" style="${styles} display:grid;">
              <div [ngStyle]="{'background-color': ${element.style.gridCellColorType == 'Mono Color' ? element.style.gridCellColor : null}, 'background-image': ${element.style.gridCellColorType == 'Line Gradient' ? 'linear-gradient(' + element.style.gridLinearGradientDirection + ',' + element.style.gridFromBackgroundColor + ',' + element.style.gridToBackgroundColor + ')' : null}"
                 *ngFor="let item of [].constructor(${element.style.gridColumnCount * element.style.gridRowCount}); let i = index">
                    Cell {{i+1}}
              </div>
            </div>`;
        break;
      case 'image':
        htmlElement = `<img id="${element.id}" style="${styles}" [src]="${element.url}">`;
        break;
      case 'label':
        htmlElement = `<label id="${element.id}" style="${styles} display:flex; place-content:center; align-items:center;">
              ${element.staticLabel || ''}
            </label>`;
        break;
      case 'text':
      case 'number':
      case 'date':
      case 'color':
        htmlElement = `<input type="${element.type}" id="${element.id}" style="${styles}" placeholder="${element.placeholder}" />`;
        break;
      case 'checkbox':
      case 'radio':
      case 'range':
        htmlElement = `<input type="${element.type}" id="${element.id}" style="${styles}"/>`;
        break;
      case 'icon':
        htmlElement = `
            <div id="${element.id}" style="${styles}">
              <mat-icon [ngStyle]="{'width': ${(element.style.width > element.style.height ? Number(element.style.height) / 2 : Number(element.style.width) / 2)}px, 'height': ${(element.style.width > element.style.height ? Number(element.style.height) / 2 : Number(element.style.width) / 2)}px, 'font-size': ${(element.style.width > element.style.height ? Number(element.style.height) / 2 : Number(element.style.width) / 2)}px, 'color': ${element.style.textColor}}">${element.icon}</mat-icon>
            </div>`;
        break;
      case 'button':
        htmlElement = `<button id="${element.id}" style="${styles}">
              ${element.staticLabel || ''}
            </button>`;
        break;
      case 'hrLine':
      case 'vrLine':
        htmlElement = `<hr id="${element.id}" style="${styles}">`;
        break;
    }
    return htmlElement;
  }
}
