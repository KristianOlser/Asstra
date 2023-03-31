import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortfolioDetailPageRoutingModule } from './portfolio-detail-routing.module';

import { PortfolioDetailPage } from './portfolio-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortfolioDetailPageRoutingModule
  ],
  declarations: [PortfolioDetailPage]
})
export class PortfolioDetailPageModule {}
