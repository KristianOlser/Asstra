import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage implements OnInit {

  buttons1 =["BUY", "SELL"];
  buttons1_Index!: number;

  buttons2 =["STOCK", "CRYPTO", "COMMODITIES"];
  buttons2_Index!: number;
  visibleButtons2: boolean = false;

  visibleButtons3: boolean = false;

  private dateValue: any;

  constructor() { 

  }

  setActiveButtons1(index: number){
    this.buttons1_Index = index;
    this.visibleButtons2 = true;
    }

  setActiveButtons2(index: number){
    this.buttons2_Index = index;
    this.visibleButtons3 = true;
    }

    get date(): any {
      return this.dateValue;
    }
    set date(value: any) {
      console.log({ value });
      this.dateValue = value;
    }
  ngOnInit() {
    
    }
}
