/// <reference types="vite/client" />

// XXX: This squelches the following error in main.ts:
//
//      "Cannot find module './App.vue' or its corresponding type declarations."
declare module "*.vue" {}
