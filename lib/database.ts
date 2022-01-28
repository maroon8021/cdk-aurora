import { Stack, StackProps } from "aws-cdk-lib";
import * as rds from "aws-cdk-lib/aws-rds";
import * as ec2 from "aws-cdk-lib/aws-ec2";
//import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";

import { Construct } from "constructs";

type DatabaseProps = StackProps & {
  vpc: ec2.Vpc;
};

export class Database extends Stack {
  public readonly dbClaster: rds.DatabaseCluster;

  constructor(scope: Construct, id: string, props: DatabaseProps) {
    super(scope, id, props);

    const { vpc } = props;

    // const secret = new secretsmanager.Secret(this, 'TemplatedSecret', {
    //   generateSecretString: {
    //     secretStringTemplate: JSON.stringify({ username: 'dbuser' }), // postgresだとデフォはadminらしい
    //     generateStringKey: 'password',
    //     excludePunctuation:true
    //   },
    // });

    this.dbClaster = new rds.DatabaseCluster(this, "aurora-database", {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_10_11,
      }),
      //credentials: rds.Credentials.fromSecret(secret), <- いらない説がある
      // `By default, the master password will be generated and stored in AWS Secrets Manager.`
      // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_rds-readme.html#starting-a-clustered-database
      instanceProps: {
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
        vpc,
      },
    });
  }
}
