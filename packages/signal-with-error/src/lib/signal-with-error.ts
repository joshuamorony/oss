import { Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export function toSignalWithError<T>(obs$: Observable<T>): {
  value: Signal<T | undefined>;
  error: Signal<any>;
} {
  const source = toSignal(
    obs$.pipe(
      map((value) => ({ value, error: undefined })),
      catchError((err) => of({ value: undefined, error: err }))
    )
  );

  const value = computed(() => source()?.value);
  const error = computed(() => source()?.error);

  return { value, error };
}
