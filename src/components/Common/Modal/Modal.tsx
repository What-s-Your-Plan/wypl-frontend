import React, { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import Box from '@/components/Common/Box/Box';
import Button from '@/components/Common/Button/Button.tsx';
import Flex from '@/components/Common/Flex/Flex';
import { Theme } from '@/styles/Theme';

export interface Confirm {
  content: string;
  handleConfirm: (() => void) | (() => Promise<void>);
}

export interface ModalProps {
  isOpen: boolean;
  cancel?: string;
  confirm?: Confirm;
  title: React.ReactNode;
  contents: React.ReactNode;
  handleClose: (() => void) | (() => Promise<void>);
}

function Modal({
  isOpen,
  cancel = '닫기',
  confirm,
  title,
  contents,
  handleClose,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        css={{ position: 'relative', zIndex: 10 }}
        onClose={() => {
          handleClose();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            css={{
              position: 'fixed',
              inset: '0',
              backgroundColor: Theme.color.black200,
              opacity: '25%',
            }}
          />
        </Transition.Child>
        <div css={{ position: 'fixed', inset: '0', overflowY: 'auto' }}>
          <Flex
            styles={{ align: 'center', justify: 'center', padding: '16px' }}
            css={{ textAlign: 'center', minHeight: '100%' }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                css={{
                  overflow: 'hidden',
                  borderRadius: '16px',
                  backgroundColor: Theme.color.white,
                  padding: '24px',
                  textAlign: 'left',
                  transform: 'scale(1)',
                  boxShadow: `0px 4px 6px rgba(0, 0, 0, 0.1)`,
                  transition: 'all 0.3s ease',
                }}
              >
                <Dialog.Title as="div">{title}</Dialog.Title>
                <Box
                  styles={{ marginTop: '8px' }}
                  css={{ maxHeight: '70vh', overflow: 'auto' }}
                >
                  {contents}
                </Box>
                <Flex
                  styles={{ marginTop: '16px', justify: 'end', gap: '12px' }}
                >
                  <Button
                    styles={{
                      $size: 'medium',
                      $variant: 'outline',
                    }}
                    onClick={() => {
                      handleClose();
                    }}
                    children={cancel}
                  />
                  {confirm ? (
                    <Button
                      styles={{
                        $size: 'medium',
                        $variant: 'primary',
                      }}
                      onClick={async () => {
                        await confirm.handleConfirm();
                        handleClose();
                      }}
                      children={confirm.content}
                    />
                  ) : null}
                </Flex>
              </Dialog.Panel>
            </Transition.Child>
          </Flex>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
