import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import * as iam from "aws-cdk-lib/aws-iam";

type BastionProps = StackProps & {
  vpc: ec2.Vpc;
  dbClaster: rds.DatabaseCluster;
};

export class Bastion extends Stack {
  constructor(scope: Construct, id: string, props: BastionProps) {
    super(scope, id, props);

    const { vpc, dbClaster } = props;

    const bastion = new ec2.BastionHostLinux(this, "aurora-BastionHost", {
      vpc,
    });

    // https://docs.aws.amazon.com/systems-manager/latest/userguide/getting-started-add-permissions-to-existing-profile.html
    bastion.instance.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "ssmmessages:CreateControlChannel",
          "ssmmessages:CreateDataChannel",
          "ssmmessages:OpenControlChannel",
          "ssmmessages:OpenDataChannel",
        ],
        resources: ["*"],
      })
    );

    bastion.instance.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["s3:GetEncryptionConfiguration"],
        resources: ["*"],
      })
    );

    bastion.connections.allowTo(dbClaster, ec2.Port.tcp(5432));
  }
}
