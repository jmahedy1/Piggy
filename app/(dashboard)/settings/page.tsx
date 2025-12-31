'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { User } from '@/types';

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500">Failed to load user data</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label="First Name"
                type="text"
                value={user.firstName}
                disabled
              />
              <Input
                label="Last Name"
                type="text"
                value={user.lastName}
                disabled
              />
              <Input
                label="Email"
                type="email"
                value={user.email}
                disabled
              />
              <p className="text-sm text-gray-500">
                Profile editing will be available in a future update.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
                disabled
              />
              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
                disabled
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                disabled
              />
              <Button variant="primary" disabled>
                Update Password
              </Button>
              <p className="text-sm text-gray-500">
                Password change functionality will be available in a future update.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Account Created</p>
                <p className="text-gray-900 mt-1">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">User ID</p>
                <p className="text-gray-900 mt-1 font-mono text-sm">{user.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="danger" disabled>
                Delete Account
              </Button>
              <p className="text-sm text-gray-500">
                Account deletion will be available in a future update.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
