import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  id?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  mobile?: string;
  email: string;
  gender?: string;
  hobbies?: string[];
  address?: string;
  country?: string;
  password?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private users$ = new BehaviorSubject<User[]>([]);
  private nextId = 100;

  constructor(private http: HttpClient) {
    this.loadInitial();
  }

  private persist(users: User[]) {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch { /* ignore */ }
  }

  private loadInitial() {
    try {
      const ls = localStorage.getItem('users');
      if (ls) {
        const parsed: User[] = JSON.parse(ls);
        this.users$.next(parsed);
        const maxId = parsed.reduce((m, u) => Math.max(m, u.id || 0), 0);
        this.nextId = maxId + 1;
        return;
      }
    } catch {
      console.log(console.error());
    }

    // fetch dummyjson users and local ali.json (assets), then normalize & merge
    const dummy$ = this.http.get<any>('https://dummyjson.com/users').pipe(
      catchError(() => of({ users: [] }))
    );
    const ali$ = this.http.get<User[]>('/assets/ali.json').pipe(
      catchError(() => of([]))
    );

    forkJoin([dummy$, ali$]).pipe(
      map(([dummyRes, aliArr]) => {
        const dummyUsersRaw: any[] = dummyRes?.users || [];
        const mappedDummy: User[] = dummyUsersRaw.map((d, idx) => {
          // normalize fields from dummyjson structure to our User interface
          const fullNameFirst = d.firstName || d.name?.split(' ')?.[0] || '';
          const fullNameLast = d.lastName || (d.name ? d.name.split(' ').slice(1).join(' ') : '') || '';
          const phone = d.phone || d.phoneNumber || d.phoneNumber || '';
          const country = (d.address && d.address.country) ? d.address.country : (d.address?.city || undefined);
          const addressParts = [];
          if (d.address?.address) addressParts.push(d.address.address);
          if (d.address?.city) addressParts.push(d.address.city);
          if (d.address?.state) addressParts.push(d.address.state);
          const addressStr = addressParts.join(', ') || undefined;
          return {
            id: d.id || (1000 + idx),
            firstName: fullNameFirst || undefined,
            middleName: undefined,
            lastName: fullNameLast || undefined,
            mobile: phone || undefined,
            email: d.email || `user${d.id}@example.com`,
            gender: d.gender || undefined,
            hobbies: [], // dummy source doesn't provide hobbies in expected format
            address: addressStr,
            country: country,
            password: undefined // no password from public API
          } as User;
        });

        // aliArr is typed already
        const combined = [...mappedDummy, ...(aliArr || [])];
        return combined;
      }),
      catchError(() => of([]))
    ).subscribe(users => {
      this.users$.next(users);
      const maxId = users.reduce((m, u) => Math.max(m, u.id || 0), 0);
      this.nextId = maxId + 1;
      this.persist(users);
    });
  }

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  getCurrentUsers(): User[] {
    return this.users$.getValue();
  }

  findByEmail(email: string): User | undefined {
    return this.getCurrentUsers().find(u => u.email?.toLowerCase() === email?.toLowerCase());
  }

  addUser(user: User): User {
    const u = { ...user, id: this.nextId++ };
    const arr = [...this.getCurrentUsers(), u];
    this.users$.next(arr);
    this.persist(arr);
    return u;
  }
}
