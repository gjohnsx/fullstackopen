import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux';
import { showNotification, hideNotification } from '../reducers/notificationReducer';
import { CheckCircleIcon, ArrowSmUpIcon, ArrowSmDownIcon } from '@heroicons/react/outline'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { NOTIFICATION_TIMEOUT } from './AnecdoteList';

const Notification = () => {
  const dispatch = useDispatch();

  const notificationData = useSelector(state => state);
  const { content, show } = notificationData.notification;

  function openModal() {
    dispatch(showNotification());
    setTimeout(() => {
      dispatch(hideNotification())
    }, NOTIFICATION_TIMEOUT);
  };

  function closeModal() {
    dispatch(hideNotification());
  };

  return (
    <>
      {/* Debug section: */}
      {/* <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div> */}

      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex-shrink-0 mr-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                  </div>

                  <div className="mr-auto">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {content.title}
                    </Dialog.Title>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {content.content}
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Got it, thanks!
                      </button>
                    </div>

                  </div>

                  <CountdownCircleTimer 
                    isPlaying
                    size={25}
                    strokeWidth={3}
                    duration={NOTIFICATION_TIMEOUT / 1000}
                    colors={'#f97316'}
                    className='flex-shrink-0 ml-2'
                  >
                    {/* {({ remainingTime }) => remainingTime} */}
                  </CountdownCircleTimer>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Notification;