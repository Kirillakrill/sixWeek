import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import CORS from './CORS.js';
import crypto from 'crypto';
import http from 'http';

import appSrc from './app.js';
const app = appSrc(express, bodyParser, fs, crypto, CORS, http);
app.listen(process.env.PORT);