import express from "express";

interface User {
  uid: string;
}

export interface RequestWithUser extends express.Request {
  user?: User;
}
