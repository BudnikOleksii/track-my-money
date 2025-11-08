import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '@track-my-money/ui/src/components/atoms/button/Button';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@track-my-money/ui/src/components/molecules/toast/Toast';

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const ToastDemo = () => {
      const [open, setOpen] = useState(false);

      return (
        <ToastProvider>
          <Button onClick={() => setOpen(true)}>Show Toast</Button>
          <Toast open={open} onOpenChange={setOpen}>
            <ToastTitle>Notification</ToastTitle>
            <ToastDescription>
              This is a default toast message.
            </ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    };

    return <ToastDemo />;
  },
};

export const WithAction: Story = {
  render: () => {
    const ToastDemo = () => {
      const [open, setOpen] = useState(false);

      return (
        <ToastProvider>
          <Button onClick={() => setOpen(true)}>Show Toast</Button>
          <Toast open={open} onOpenChange={setOpen}>
            <ToastTitle>Notification</ToastTitle>
            <ToastDescription>
              Your message has been sent successfully.
            </ToastDescription>
            <ToastAction
              altText="Undo action"
              onClick={() => alert('Undo clicked')}
            >
              Undo
            </ToastAction>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    };

    return <ToastDemo />;
  },
};

export const Destructive: Story = {
  render: () => {
    const ToastDemo = () => {
      const [open, setOpen] = useState(false);

      return (
        <ToastProvider>
          <Button variant="destructive" onClick={() => setOpen(true)}>
            Show Error
          </Button>
          <Toast variant="destructive" open={open} onOpenChange={setOpen}>
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>
              Something went wrong. Please try again.
            </ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    };

    return <ToastDemo />;
  },
};

export const Success: Story = {
  render: () => {
    const ToastDemo = () => {
      const [open, setOpen] = useState(false);

      return (
        <ToastProvider>
          <Button onClick={() => setOpen(true)}>Show Success</Button>
          <Toast variant="success" open={open} onOpenChange={setOpen}>
            <ToastTitle>Success!</ToastTitle>
            <ToastDescription>
              Your changes have been saved successfully.
            </ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    };

    return <ToastDemo />;
  },
};

export const TitleOnly: Story = {
  render: () => {
    const ToastDemo = () => {
      const [open, setOpen] = useState(false);

      return (
        <ToastProvider>
          <Button onClick={() => setOpen(true)}>Show Toast</Button>
          <Toast open={open} onOpenChange={setOpen}>
            <ToastTitle>Simple notification message</ToastTitle>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    };

    return <ToastDemo />;
  },
};

export const LongContent: Story = {
  render: () => {
    const ToastDemo = () => {
      const [open, setOpen] = useState(false);

      return (
        <ToastProvider>
          <Button onClick={() => setOpen(true)}>Show Toast</Button>
          <Toast open={open} onOpenChange={setOpen}>
            <ToastTitle>Update Available</ToastTitle>
            <ToastDescription>
              A new version of the application is available. Click the button
              below to update to the latest version and enjoy new features and
              improvements.
            </ToastDescription>
            <ToastAction
              altText="Update now"
              onClick={() => alert('Updating...')}
            >
              Update
            </ToastAction>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    };

    return <ToastDemo />;
  },
};

export const MultipleToasts: Story = {
  render: () => {
    const ToastDemo = () => {
      const [toasts, setToasts] = useState<{ id: string; open: boolean }[]>([]);

      const addToast = () => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, open: true }]);
      };

      const closeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      };

      return (
        <ToastProvider>
          <Button onClick={addToast}>Add Toast</Button>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              open={toast.open}
              onOpenChange={(open) => {
                if (!open) closeToast(toast.id);
              }}
            >
              <ToastTitle>Notification {toast.id.slice(-4)}</ToastTitle>
              <ToastDescription>
                This is toast #{toast.id.slice(-4)}
              </ToastDescription>
              <ToastClose />
            </Toast>
          ))}
          <ToastViewport />
        </ToastProvider>
      );
    };

    return <ToastDemo />;
  },
};

export const AllVariants: Story = {
  render: () => {
    const ToastDemo = () => {
      const [defaultOpen, setDefaultOpen] = useState(false);
      const [destructiveOpen, setDestructiveOpen] = useState(false);
      const [successOpen, setSuccessOpen] = useState(false);

      return (
        <ToastProvider>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button onClick={() => setDefaultOpen(true)}>Default</Button>
            <Button
              variant="destructive"
              onClick={() => setDestructiveOpen(true)}
            >
              Destructive
            </Button>
            <Button onClick={() => setSuccessOpen(true)}>Success</Button>
          </div>
          <Toast open={defaultOpen} onOpenChange={setDefaultOpen}>
            <ToastTitle>Default Toast</ToastTitle>
            <ToastDescription>
              This is a default toast message.
            </ToastDescription>
            <ToastClose />
          </Toast>
          <Toast
            variant="destructive"
            open={destructiveOpen}
            onOpenChange={setDestructiveOpen}
          >
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>
              Something went wrong. Please try again.
            </ToastDescription>
            <ToastClose />
          </Toast>
          <Toast
            variant="success"
            open={successOpen}
            onOpenChange={setSuccessOpen}
          >
            <ToastTitle>Success!</ToastTitle>
            <ToastDescription>
              Operation completed successfully.
            </ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    };

    return <ToastDemo />;
  },
};

export const WithDuration: Story = {
  render: () => {
    const ToastDemo = () => {
      const [open, setOpen] = useState(false);

      return (
        <ToastProvider duration={3000}>
          <Button onClick={() => setOpen(true)}>Show Toast (3s)</Button>
          <Toast open={open} onOpenChange={setOpen}>
            <ToastTitle>Auto-dismiss</ToastTitle>
            <ToastDescription>
              This toast will automatically dismiss after 3 seconds.
            </ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    };

    return <ToastDemo />;
  },
};

export const SaveNotification: Story = {
  render: () => {
    const ToastDemo = () => {
      const [open, setOpen] = useState(false);

      const handleSave = () => {
        setOpen(true);
      };

      return (
        <ToastProvider>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              minWidth: '300px',
            }}
          >
            <textarea
              placeholder="Enter your text here..."
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #ccc',
                minHeight: '100px',
              }}
            />
            <Button onClick={handleSave}>Save</Button>
          </div>
          <Toast variant="success" open={open} onOpenChange={setOpen}>
            <ToastTitle>Saved!</ToastTitle>
            <ToastDescription>Your changes have been saved.</ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    };

    return <ToastDemo />;
  },
};

export const ActionRequired: Story = {
  render: () => {
    const ToastDemo = () => {
      const [open, setOpen] = useState(false);

      return (
        <ToastProvider>
          <Button onClick={() => setOpen(true)}>Schedule Meeting</Button>
          <Toast open={open} onOpenChange={setOpen}>
            <ToastTitle>Meeting Scheduled</ToastTitle>
            <ToastDescription>
              Your meeting has been scheduled for tomorrow at 2:00 PM.
            </ToastDescription>
            <ToastAction
              altText="View calendar"
              onClick={() => alert('Opening calendar...')}
            >
              View
            </ToastAction>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    };

    return <ToastDemo />;
  },
};
