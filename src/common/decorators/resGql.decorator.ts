import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

export const ResGql = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().res;
  },
);

export const ReqGql = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  },
);
