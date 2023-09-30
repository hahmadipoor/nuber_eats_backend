import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { NEW_COOKED_ORDER,  NEW_ORDER_UPDATE,  NEW_PENDING_ORDER,  PUB_SUB,} from 'src/common/common.constants';
import { Userr } from 'src/users/entities/user.entity';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';
import { OrderUpdatesInput } from './dtos/order-updates.dto';
import { TakeOrderInput, TakeOrderOutput } from './dtos/take-order.dto';
import { Order } from './entities/order.entity';
import { OrderService } from './orders.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(of => Order)
export class OrderResolver {
  constructor(
    private readonly ordersService: OrderService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Mutation(returns => CreateOrderOutput)
  @Role(['Client'])
  @UseGuards(AuthGuard)
  async createOrder( @AuthUser() customer: Userr,  @Args('input')    createOrderInput: CreateOrderInput ): Promise<CreateOrderOutput> {
    return this.ordersService.createOrder(customer, createOrderInput);
  }

  @Query(returns => GetOrdersOutput)
  @Role(['Any'])
  @UseGuards(AuthGuard)
  async getOrders( @AuthUser() userr: Userr, @Args('input') getOrdersInput: GetOrdersInput,): Promise<GetOrdersOutput> {
    return this.ordersService.getOrders(userr, getOrdersInput);
  }

  @Query(returns => GetOrderOutput)
  @Role(['Any'])
  @UseGuards(AuthGuard)
  async getOrder(  @AuthUser() userr: Userr, @Args('input') getOrderInput: GetOrderInput,): Promise<GetOrderOutput> {
    return this.ordersService.getOrder(userr, getOrderInput);
  }

  @Mutation(returns => EditOrderOutput)
  @Role(['Any'])
  @UseGuards(AuthGuard)
  async editOrder( @AuthUser() userr: Userr, @Args('input') editOrderInput: EditOrderInput,): Promise<EditOrderOutput> {
    return this.ordersService.editOrder(userr, editOrderInput);
  }

  @Subscription(returns => Order, {
    filter: ({ pendingOrders: { ownerId } }, _, { userr }) => {
      return ownerId === userr.id;
    },
    resolve: ({ pendingOrders: { order } }) => order,
  })
  @Role(['Owner'])
  @UseGuards(AuthGuard)
  pendingOrders() {
    return this.pubSub.asyncIterator(NEW_PENDING_ORDER);
  }

  @Subscription(returns => Order)
  @Role(['Delivery'])
  @UseGuards(AuthGuard)
  cookedOrders() {
    return this.pubSub.asyncIterator(NEW_COOKED_ORDER);
  }

  @Subscription(returns => Order, {
    filter: (
      { orderUpdates: order }: { orderUpdates: Order },
      { input }: { input: OrderUpdatesInput },
      { userr }: { userr: Userr },
    ) => {
      if ( order.driverId !== userr.id &&  order.customerId !== userr.id && order.restaurant.ownerId !== userr.id) {
        return false;
      }
      return order.id === input.id;
    },
  })
  @Role(['Any'])
  @UseGuards(AuthGuard)
  orderUpdates(@Args('input') orderUpdatesInput: OrderUpdatesInput) {
    return this.pubSub.asyncIterator(NEW_ORDER_UPDATE);
  }

  @Mutation(returns => TakeOrderOutput)
  @Role(['Delivery'])
  @UseGuards(AuthGuard)
  takeOrder(@AuthUser() driver: Userr,@Args('input') takeOrderInput: TakeOrderInput,): Promise<TakeOrderOutput> {
    return this.ordersService.takeOrder(driver, takeOrderInput);
  }
}
