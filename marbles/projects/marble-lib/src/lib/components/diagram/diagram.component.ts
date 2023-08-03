import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, TimestampProvider, interval, tap, timestamp } from 'rxjs';
import { DiagramViewModel } from './diagram.vm';

@Component({
  selector: 'marble-diagram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {
  @Input({required: true})
  source$!: Observable<any>;

  destroyRef = inject(DestroyRef);

  vm$ = new BehaviorSubject<DiagramViewModel>({
    totalTime: 0, 
    nexts: []
  });

  ngOnInit() {
    const start = Date.now();
    const timeProvider: TimestampProvider = {
      now: () => Math.round((Date.now() - start) / 100)
    }

    const sub = this.source$.pipe(
      timestamp(timeProvider), 
      ).subscribe(val => {
      this.vm$.next({
        ...this.vm$.value, 
        totalTime: val.timestamp,
        nexts: [...this.vm$.value.nexts, {
          value: String(val.value), 
          time: val.timestamp
        }]
      })
    });

    const sub2 = interval(50).subscribe(val => {
      this.vm$.next({
        ...this.vm$.value, 
        totalTime: timeProvider.now()
      })
    })

    this.destroyRef.onDestroy(() => sub.unsubscribe());


  }


}
