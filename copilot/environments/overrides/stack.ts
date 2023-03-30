import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import { aws_cloudfront as cf } from 'aws-cdk-lib';

interface TransformedStackProps extends cdk.StackProps {
    readonly appName: string;
    readonly envName: string;
}

export class TransformedStack extends cdk.Stack {
    public readonly template: cdk.cloudformation_include.CfnInclude;
    public readonly appName: string;
    public readonly envName: string;

    constructor (scope: cdk.App, id: string, props: TransformedStackProps) {
        super(scope, id, props);
        this.template = new cdk.cloudformation_include.CfnInclude(this, 'Template', {
            templateFile: path.join('.build', 'in.yml'),
        });
        this.appName = props.appName;
        this.envName = props.envName;
        
        // api/* を ALB に向ける
        const cdn = this.template.getResource("CloudFrontDistribution") as cf.CfnDistribution;
        const config = cdn.distributionConfig as cf.CfnDistribution.DistributionConfigProperty;
        const defaultCacheBehavior = config.defaultCacheBehavior as cf.CfnDistribution.DefaultCacheBehaviorProperty
        const cacheBehaviors = config.cacheBehaviors as cf.CfnDistribution.CacheBehaviorProperty[];
        // defaultCacheBehavior と同じ挙動を api/* に設定 
        cacheBehaviors.unshift({
            allowedMethods: defaultCacheBehavior.allowedMethods,
            pathPattern: 'api/*',
            targetOriginId: defaultCacheBehavior.targetOriginId,
            viewerProtocolPolicy: defaultCacheBehavior.viewerProtocolPolicy,
            cachePolicyId: defaultCacheBehavior.cachePolicyId,
        })
    }   
}