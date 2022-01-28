# ざつめも

## Invalid DB Instance class: db.t2.nano (Service: AmazonRDS; Status Code: 400; Error Code: InvalidParameterValue; Request ID: 034d7825-f17a-403d-add1-1c6f761b02e0; Proxy: null)

- db.t2.nano なんて存在しなかった
  - db.t2.micro が最小 : https://aws.amazon.com/jp/rds/instance-types/

## RDS does not support creating a DB instance with the following combination: DBInstanceClass=db.t2.micro, Engine=aurora-postgresql, EngineVersion=10.11, LicenseModel=postgresql-license. For supported combinations of instance class and database engine version, see the documentation.

サポートされてない、なんてあるんか。
多分これ t3.medium からじゃないと対象じゃない

https://aws.amazon.com/jp/premiumsupport/knowledge-center/aurora-mysql-instance-class-error/#RDS_does_not_support_creating_a_DB_instance_with_the_following_combination.3A_DBInstanceClass.3Ddb.r5.8xlarge.2C_Engine.3Daurora.2C_EngineVersion.3D5.6.10a.2C_LicenseModel.3Dgeneral-public-license

https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/AuroraUserGuide/Concepts.DBInstanceClass.html#Concepts.DBInstanceClass.SupportAurora

## in bastion

psql 入れる必要がある
https://qiita.com/panayan/items/634ad5ad895f0c9e5bd0

```sh
yum list | grep postgre
sudo yum update
sudo yum install postgresql.x86_64


psql -h aa1hsbb401ez2qc.cjray9vzzsah.ap-northeast-1.rds.amazonaws.com -U postgres
```

※: https://aws.amazon.com/jp/premiumsupport/knowledge-center/rds-connect-using-bastion-host-linux/

```sql
# テーブル作ってdatabaseを作る
create database test;
\q

```

```sh
psql -h aa1hsbb401ez2qc.cjray9vzzsah.ap-northeast-1.rds.amazonaws.com -U postgres -d test
```

```sql
# テーブル作ってdatabaseを作る
create table test_table (
  id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP default current_timestamp
);

insert into test_table (name) values ('hoge');

\q

```

https://qiita.com/Shitimi_613/items/bcd6a7f4134e6a8f0621

https://qiita.com/shonansurvivors/items/4522f15c5e9a30860bc5

https://stackoverflow.com/questions/9556474/how-do-i-automatically-update-a-timestamp-in-postgresql
