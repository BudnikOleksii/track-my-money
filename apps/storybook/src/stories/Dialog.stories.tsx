import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '@track-my-money/ui/src/components/atoms/button/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@track-my-money/ui/src/components/molecules/dialog/Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Molecules/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description. It provides additional context about
            what this dialog is for.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive">Delete Account</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const FormDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            paddingTop: '1rem',
          }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <label
              htmlFor="name"
              style={{ fontSize: '0.875rem', fontWeight: 500 }}
            >
              Name
            </label>
            <input
              id="name"
              defaultValue="John Doe"
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <label
              htmlFor="username"
              style={{ fontSize: '0.875rem', fontWeight: 500 }}
            >
              Username
            </label>
            <input
              id="username"
              defaultValue="@johndoe"
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #ccc',
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ConfirmationDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive">Delete</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Terms of Service</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read our terms of service carefully.
          </DialogDescription>
        </DialogHeader>
        <div
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
            paddingRight: '1rem',
          }}
        >
          <p style={{ marginBottom: '1rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis
            aliquam nisl nunc quis nisl.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Sed euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc,
            quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget
            ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc
            quis nisl.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Praesent euismod, nisl eget ultricies aliquam, nunc nisl aliquet
            nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget
            ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc
            quis nisl.
          </p>
          <p>
            Fusce euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc,
            quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget
            ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc
            quis nisl.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Accept</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Controlled: Story = {
  render: () => {
    const ControlledDialog = () => {
      const [open, setOpen] = useState(false);

      return (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Open Controlled Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Controlled Dialog</DialogTitle>
                <DialogDescription>
                  This dialog&apos;s open state is controlled by React state.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => setOpen(true)}>
            Open from outside
          </Button>
        </div>
      );
    };

    return <ControlledDialog />;
  },
};

export const NoCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent showClose={false}>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog doesn&apos;t have a close button. You must use the
            Cancel button below.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
