#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { Network } from "../lib/network";
import { Database } from "../lib/database";
import { Bastion } from "../lib/bastion";

const app = new cdk.App();

const { vpc } = new Network(app, "aurora-test-network");

const { dbClaster } = new Database(app, "aurora-test-database", { vpc });

new Bastion(app, "aurora-test-bastion", { vpc, dbClaster });
