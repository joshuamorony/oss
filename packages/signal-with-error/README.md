# toSignalWithError

Converts an observable into a pair of signals: **value** which will contain the
success value or `undefined`, and **error** which will contain any error or
`undefined`.

This provides a nice way to simply handle errors from observable streams using
signals in a reactive/declarative way.

You can also optionally pass an initial value like this:

```ts
toSignalWithError(obs$, 5);
```

If an initial value is not supplied, it will be assumed that the observable you
supply is synchronous (if it is not, the signal will throw an error).

## Example Usage

```ts
  data = toSignalWithError(this.getFromAPI())

  getFromAPI() {
    return of(null).pipe(
      delay(2000),
      switchMap(() =>
        this.http.get<any>("https://jsonplaceholder.typicode.com/todos")
      )
    );
  }

```

```html
<p>Let's load some data!</p>
<ul>
  <ng-container *ngIf="myService.data.value(); else loading">
    <li *ngFor="let todo of myService.data.value()">{{ todo.title }}</li>
  </ng-container>
  <ng-template #loading>
    <li *ngIf="!myService.data.error(); else failed">They see me loadin'...</li>
  </ng-template>
  <ng-template #failed>
    <p>Uh oh... you're on your own buddy:</p>
    <small> {{ myService.data.error().message }} </small>
  </ng-template>
</ul>
```
