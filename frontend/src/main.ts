import { bootstrapApplication } from '@angular/platform-browser';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { provideHttpClient } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client/core';
import { provideRouter } from '@angular/router';
import { inject } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

const apolloClient = () => {
  const httpLink = inject(HttpLink);
  return {
    cache: new InMemoryCache(),
    link: httpLink.create({ uri: 'https://101024415-comp-3133-assignment1.vercel.app/graphql' }), // Ensure the correct GraphQL URL
  };
};

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    HttpLink, // Ensure HttpLink is in the providers
    provideApollo(apolloClient), // Ensure the Apollo Client is provided
  ],
});