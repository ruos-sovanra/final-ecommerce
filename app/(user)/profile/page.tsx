'use client';
import {Fragment, useEffect, useState} from 'react'
import {Dialog, Menu, Switch, Transition} from '@headlessui/react'
import {Bars3Icon, CheckCircleIcon} from '@heroicons/react/20/solid'
import {
    BellIcon,
    CreditCardIcon,
    CubeIcon, EllipsisVerticalIcon,
    FingerPrintIcon,
    UserCircleIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {useGetOrderQuery} from "@/redux/service/order";
import {endOfYear, format, startOfYear} from "date-fns";


const secondaryNavigation = [
    { name: 'General', href: '#', icon: UserCircleIcon, current: true },
    { name: 'Security', href: '#', icon: FingerPrintIcon, current: false },
    { name: 'Notifications', href: '#', icon: BellIcon, current: false },
    { name: 'Plan', href: '#', icon: CubeIcon, current: false },
    { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
    { name: 'Team members', href: '#', icon: UsersIcon, current: false },
]

type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
};

type OrderResult = {
    id: number;
    uuid: string;
    status: string;
    addressId: string;
    quantity: number;
    totalPrice: number;
    OrderDetailNumber: string;
    product: Product;
    userName: string;
};


function classNames(...classes:string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfilePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [orders, setOrders] = useState<OrderResult[]>([])

    const {data, error, isLoading} = useGetOrderQuery()

    console.log(data)

    useEffect(() => {
        if (data) {
            setOrders(data.results)
        }
    }, [data]);

    const getRandomDate = () => {
        const now = new Date();
        const start = startOfYear(now);
        const end = endOfYear(now);
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

        return new Date(randomDate);
    }

    const randomDate = getRandomDate();
    console.log(format(randomDate, 'dd-MM-yyyy'));


    return (
        <>
            <div className="container mx-auto  lg:flex lg:gap-x-16 lg:px-8">
                <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
                    <nav className="flex-none px-4 sm:px-6 lg:px-0">
                        <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                            {secondaryNavigation.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                'h-6 w-6 shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
                    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                This information will be displayed publicly so be careful what you share.
                            </p>

                            <div className="bg-white">
                                <div className="py-8">
                                    <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
                                        <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
                                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order
                                                history</h1>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Check the status of recent orders, manage returns, and discover similar
                                                products.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-16">
                                        <h2 className="sr-only">Recent orders</h2>
                                        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
                                            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                                                {orders.map((order) => (
                                                    <div
                                                        key={order.uuid}
                                                        className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                                                    >
                                                        <h3 className="sr-only">
                                                            Order placed on {format(randomDate, 'dd-MM-yyyy')}
                                                        </h3>

                                                        <div
                                                            className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                                                            <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                                                                <div>
                                                                    <dt className="font-medium text-gray-900">Order
                                                                        number
                                                                    </dt>
                                                                    <dd className="mt-1 text-gray-500">{order.uuid}</dd>
                                                                </div>
                                                                <div className="hidden sm:block">
                                                                    <dt className="font-medium text-gray-900">Date
                                                                        placed
                                                                    </dt>
                                                                    <dd className="mt-1 text-gray-500">
                                                                        {format(randomDate, 'dd-MM-yyyy')}
                                                                        {/*<time*/}
                                                                        {/*    dateTime={order.createdDatetime}>{order.createdDate}</time>*/}
                                                                    </dd>
                                                                </div>
                                                                <div>
                                                                    <dt className="font-medium text-gray-900">Total
                                                                        amount
                                                                    </dt>
                                                                    <dd className="mt-1 font-medium text-gray-900">{order.quantity * order.product.price}</dd>
                                                                </div>
                                                            </dl>

                                                            <Menu as="div"
                                                                  className="relative flex justify-end lg:hidden">
                                                                <div className="flex items-center">
                                                                    <Menu.Button
                                                                        className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                                                                        <span
                                                                            className="sr-only">Options for order {order.uuid}</span>
                                                                        <EllipsisVerticalIcon className="h-6 w-6"
                                                                                              aria-hidden="true"/>
                                                                    </Menu.Button>
                                                                </div>

                                                                <Transition
                                                                    as={Fragment}
                                                                    enter="transition ease-out duration-100"
                                                                    enterFrom="transform opacity-0 scale-95"
                                                                    enterTo="transform opacity-100 scale-100"
                                                                    leave="transition ease-in duration-75"
                                                                    leaveFrom="transform opacity-100 scale-100"
                                                                    leaveTo="transform opacity-0 scale-95"
                                                                >
                                                                    <Menu.Items
                                                                        className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                        <div className="py-1">
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <a
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'block px-4 py-2 text-sm'
                                                                                        )}
                                                                                    >
                                                                                        View
                                                                                    </a>
                                                                                )}
                                                                            </Menu.Item>
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <a
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'block px-4 py-2 text-sm'
                                                                                        )}
                                                                                    >
                                                                                        Invoice
                                                                                    </a>
                                                                                )}
                                                                            </Menu.Item>
                                                                        </div>
                                                                    </Menu.Items>
                                                                </Transition>
                                                            </Menu>

                                                            <div
                                                                className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                                                                <a
                                                                    className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                                >
                                                                    <span>View Order</span>
                                                                    <span className="sr-only">{order.uuid}</span>
                                                                </a>
                                                                <a
                                                                    className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                                >
                                                                    <span>View Invoice</span>
                                                                    <span
                                                                        className="sr-only">for order {order.uuid}</span>
                                                                </a>
                                                            </div>
                                                        </div>

                                                        {/* Products */}
                                                        <h4 className="sr-only">Items</h4>
                                                        <ul role="list" className="divide-y divide-gray-200">
                                                            <li key={order.product.id} className="p-4 sm:p-6">
                                                                <div className="flex items-center sm:items-start">
                                                                    <div
                                                                        className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                                                                        <img
                                                                            src={order.product.image}
                                                                            alt={order.product.name}
                                                                            className="h-full w-full object-cover object-center"
                                                                        />
                                                                    </div>
                                                                    <div className="ml-6 flex-1 text-sm">
                                                                        <div
                                                                            className="font-medium text-gray-900 sm:flex sm:justify-between">
                                                                            <h5>{order.product.name}</h5>
                                                                            <p className="mt-2 sm:mt-0">{order.product.price}</p>
                                                                        </div>
                                                                        <p className="hidden text-gray-500 sm:mt-2 sm:block">{order.product.description}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="mt-6 sm:flex sm:justify-between">
                                                                    <div className="flex items-center">
                                                                        <CheckCircleIcon
                                                                            className="h-5 w-5 text-green-500"
                                                                            aria-hidden="true"/>
                                                                        <p className="ml-2 text-sm font-medium text-gray-500">
                                                                            Delivered on {format(randomDate, 'dd-MM-yyyy')}
                                                                        </p>
                                                                    </div>

                                                                    <div
                                                                        className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                                                                        <div className="flex flex-1 justify-center">
                                                                            <a
                                                                                className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                                                                            >
                                                                                View product
                                                                            </a>
                                                                        </div>
                                                                        <div
                                                                            className="flex flex-1 justify-center pl-4">
                                                                            <a href="#"
                                                                               className="whitespace-nowrap text-indigo-600 hover:text-indigo-500">
                                                                                Buy again
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*  <div>*/}
                        {/*      <h2 className="text-base font-semibold leading-7 text-gray-900">Bank accounts</h2>*/}
                        {/*      <p className="mt-1 text-sm leading-6 text-gray-500">Connect bank accounts to your account.</p>*/}

                        {/*      <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">*/}
                        {/*          <li className="flex justify-between gap-x-6 py-6">*/}
                        {/*              <div className="font-medium text-gray-900">TD Canada Trust</div>*/}
                        {/*              <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                        {/*                  Update*/}
                        {/*              </button>*/}
                        {/*          </li>*/}
                        {/*          <li className="flex justify-between gap-x-6 py-6">*/}
                        {/*              <div className="font-medium text-gray-900">Royal Bank of Canada</div>*/}
                        {/*              <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                        {/*                  Update*/}
                        {/*              </button>*/}
                        {/*          </li>*/}
                        {/*      </ul>*/}

                        {/*      <div className="flex border-t border-gray-100 pt-6">*/}
                        {/*          <button type="button" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">*/}
                        {/*              <span aria-hidden="true">+</span> Add another bank*/}
                        {/*          </button>*/}
                        {/*      </div>*/}
                        {/*  </div>*/}

                        {/*  <div>*/}
                        {/*      <h2 className="text-base font-semibold leading-7 text-gray-900">Integrations</h2>*/}
                        {/*      <p className="mt-1 text-sm leading-6 text-gray-500">Connect applications to your account.</p>*/}

                        {/*      <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">*/}
                        {/*          <li className="flex justify-between gap-x-6 py-6">*/}
                        {/*              <div className="font-medium text-gray-900">QuickBooks</div>*/}
                        {/*              <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                        {/*                  Update*/}
                        {/*              </button>*/}
                        {/*          </li>*/}
                        {/*      </ul>*/}

                        {/*      <div className="flex border-t border-gray-100 pt-6">*/}
                        {/*          <button type="button" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">*/}
                        {/*              <span aria-hidden="true">+</span> Add another application*/}
                        {/*          </button>*/}
                        {/*      </div>*/}
                        {/*  </div>*/}

                        {/*  <div>*/}
                        {/*      <h2 className="text-base font-semibold leading-7 text-gray-900">Language and dates</h2>*/}
                        {/*      <p className="mt-1 text-sm leading-6 text-gray-500">*/}
                        {/*          Choose what language and date format to use throughout your account.*/}
                        {/*      </p>*/}

                        {/*      <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">*/}
                        {/*          <div className="pt-6 sm:flex">*/}
                        {/*              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Language</dt>*/}
                        {/*              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                        {/*                  <div className="text-gray-900">English</div>*/}
                        {/*                  <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                        {/*                      Update*/}
                        {/*                  </button>*/}
                        {/*              </dd>*/}
                        {/*          </div>*/}
                        {/*          <div className="pt-6 sm:flex">*/}
                        {/*              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Date format</dt>*/}
                        {/*              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                        {/*                  <div className="text-gray-900">DD-MM-YYYY</div>*/}
                        {/*                  <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">*/}
                        {/*                      Update*/}
                        {/*                  </button>*/}
                        {/*              </dd>*/}
                        {/*          </div>*/}
                        {/*          <Switch.Group as="div" className="flex pt-6">*/}
                        {/*              <Switch.Label as="dt" className="w-64 flex-none pr-6 font-medium text-gray-900" passive>*/}
                        {/*                  Automatic timezone*/}
                        {/*              </Switch.Label>*/}
                        {/*              <dd className="flex flex-auto items-center justify-end">*/}
                        {/*                  <Switch*/}
                        {/*                      checked={automaticTimezoneEnabled}*/}
                        {/*                      onChange={setAutomaticTimezoneEnabled}*/}
                        {/*                      className={classNames(*/}
                        {/*                          automaticTimezoneEnabled ? 'bg-indigo-600' : 'bg-gray-200',*/}
                        {/*                          'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'*/}
                        {/*                      )}*/}
                        {/*                  >*/}
                        {/*<span*/}
                        {/*    aria-hidden="true"*/}
                        {/*    className={classNames(*/}
                        {/*        automaticTimezoneEnabled ? 'translate-x-3.5' : 'translate-x-0',*/}
                        {/*        'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'*/}
                        {/*    )}*/}
                        {/*/>*/}
                        {/*                  </Switch>*/}
                        {/*              </dd>*/}
                        {/*          </Switch.Group>*/}
                        {/*      </dl>*/}
                        {/*  </div>*/}
                    </div>
                </main>
            </div>
        </>
    )
}
