import { Component, Inject, HostListener, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public headerSticky: boolean = false;
  public portfolioValue: string = 'all';
  public progressCollection: HTMLCollection;
  public aboutSkillsDiv: HTMLElement = null;
  public isActiveProgress = false;
  public realStickyHeader: HTMLElement = null;
  public fakeStickyHeader = null;
  public headerElemInView = 'about';
  public source = timer(100, 100);
  public objectToFilter;
  public contact = {
    name: '',
    email: '',
    message: ''
  };
  public submitReport = '';
  public submitReportSuccess = null;
  public submitLoading = false;
  public currentValue = 'all';
  constructor(
  @Inject(DOCUMENT) private document: Document, private router: Router, public http: HttpClient) {
    this.objectToFilter = {
      seoreborn: 'all, front-end, back-end, html, css, angular, node.js, javascript, typescript, csharp',
      piwid: 'all, front-end, back-end, html, css, angular, node.js, javascript, typescript, csharp'
    };
  }
  checkFilter(value: string) {
    return this.objectToFilter[value].includes(this.currentValue);
  }
  ngOnInit() {
      AOS.init();
      this.progressCollection = document.getElementsByClassName('progress');
      this.aboutSkillsDiv = document.getElementById('aboutSkillsDiv');
      this.realStickyHeader = document.querySelector('header');
      this.fakeStickyHeader =  document.getElementsByClassName('fake-header')[0];
  }
  public start(i) {
    if (i < this.progressCollection.length) {
      setTimeout(() => {
        const item = this.progressCollection[i];
        if (item.classList.contains('100')) {
          this.progressCollection[i].classList.add('progress100');
        } else if (item.classList.contains('80')) {
          this.progressCollection[i].classList.add('progress80');
        } else if (item.classList.contains('75')) {
          this.progressCollection[i].classList.add('progress75');
        } else if (item.classList.contains('70')) {
          this.progressCollection[i].classList.add('progress70');
        } else if (item.classList.contains('60')) {
          this.progressCollection[i].classList.add('progress60');
        } else if (item.classList.contains('40')) {
          this.progressCollection[i].classList.add('progress60');
        }
        i++;
        this.start(i);
      }, 100);
    }
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
        this.source.subscribe(val => {
          const windowScrollHeight = window.pageYOffset;
          if (windowScrollHeight >= window.innerHeight) {
              this.headerSticky = true;
          } else {
              this.headerSticky = false;
          }
          if (this.isElementXPercentInViewport(this.aboutSkillsDiv, 10) && !this.isActiveProgress) {
            this.isActiveProgress = true;
            this.start(0);
          }
          this.stickyHeader();
          if (this.isElementXPercentInViewport(document.getElementById('aboutAnchor'), 30)) {
            this.headerElemInView = 'about';
          } else if (this.isElementXPercentInViewport(document.getElementById('aboutSkillsDiv'), 30)) {
            this.headerElemInView = 'about';
          } else if (this.isElementXPercentInViewport(document.getElementById('whatIdoAnchor'), 30)) {
            this.headerElemInView = 'whatido';
          } else if (this.isElementXPercentInViewport(document.getElementById('paymentWhatIDo'), 30)) {
            this.headerElemInView = 'whatido';
          } else if (this.isElementXPercentInViewport(document.getElementById('portfolioAnchor'), 30)) {
            this.headerElemInView = 'portfolio';
          } else if (this.isElementXPercentInViewport(document.getElementById('contact'), 30)) {
            this.headerElemInView = 'contact';
          }
        });
  }

  public updatePortfolio(value: any) {
    this.portfolioValue = value;
    this.currentValue = value;
  }

   public isElementXPercentInViewport(el: any, percentVisible: any) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    return !(
      Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100)) < percentVisible ||
      Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible);
  }

  public stickyHeader() {
    const sr1 = this.fakeStickyHeader.getBoundingClientRect();
    const sr2 = this.realStickyHeader.getBoundingClientRect();
    if (sr1.top > 0) {
      this.realStickyHeader.classList.remove('sticky');
      this.fakeStickyHeader.style.top = 0;
    } else {
      this.realStickyHeader.classList.add('sticky');
      this.fakeStickyHeader.style.top = `-${sr2.height + 1}px`;
    }
  }
  public openPanel(value: string) {
    window.open("http://seo-reborn.com/", "_blank");
    // let dialogRef;
    // if (value === 'seoreborn') {
    //   dialogRef = this.dialog.open(ModalSEORebornComponent, {
    //     width: '100%',
    //     height: '95%',
    //     data: { english: true }
    //   });
    // }
  }

  sendMessage(formContact: NgForm) {

  }
}

