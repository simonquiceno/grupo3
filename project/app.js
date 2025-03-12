const { Pool } = require('pg');
import express from "express";
import dbconnection from "./dbconnection";
// import pool

const pool = new Pool(dbconnection);