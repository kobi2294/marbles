import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { bufferCount, filter, interval, map, skip, take } from 'rxjs';
import { DiagramComponent } from "../../../marble-lib/src/lib/components/diagram/diagram.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, DiagramComponent]
})
export class AppComponent {
  obs1$ = interval(1000);

  obs2$ = this.obs1$.pipe(
    map(i => i * 2)
  )

  obs3$ = this.obs2$.pipe(
    filter(i => i % 3 === 0)
  )

  obs4$ = this.obs3$.pipe(
    bufferCount(2, 1)
  );

  obs5$ = this.obs3$.pipe(
    skip(5)
  )

  obs6$ = this.obs5$.pipe(
    take(4)
  )
}
