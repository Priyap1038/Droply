"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
import { Avatar } from "@heroui/avatar";
import { Divider } from "@heroui/divider";
import Badge from "./ui/Badge";
import { useRouter } from "next/navigation";
import { Mail, User, LogOut, Shield, ArrowRight } from "lucide-react";

export default function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center p-12">
        <Spinner size="lg" color="primary" />
        <p className="mt-4 text-default-600">Loading your profile...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <Card className="max-w-md mx-auto border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex gap-3">
          <User className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">User Profile</h2>
        </CardHeader>
        <Divider />
        <CardBody className="text-center py-10">
          <div className="mb-6">
            <Avatar name="Guest" size="lg" className="mx-auto mb-4" />
            <p className="text-lg font-medium">Not Signed In</p>
            <p className="text-default-500 mt-2">
              Please sign in to access your profile
            </p>
          </div>
          <Button
            variant="solid"
            color="primary"
            size="lg"
            onClick={() => router.push("/sign-in")}
            className="px-8"
            endContent={<ArrowRight className="h-4 w-4" />}
          >
            Sign In
          </Button>
        </CardBody>
      </Card>
    );
  }

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  const email = user.primaryEmailAddress?.emailAddress || "";
  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const userRole = user.publicMetadata.role as string | undefined;

  const handleSignOut = () => {
    signOut(() => {
      router.push("/");
    });
  };

  return (
    <Card className="max-w-md mx-auto border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden">
      <CardHeader className="flex gap-4 px-8 pt-8 pb-4">
        <div className="p-2.5 bg-primary/10 rounded-2xl">
          <User className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Account Profile</h2>
      </CardHeader>
      <Divider className="opacity-50" />
      <CardBody className="py-8 px-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-50 scale-150 animate-pulse-slow"></div>
            {user.imageUrl ? (
              <Avatar
                src={user.imageUrl}
                alt={fullName}
                size="lg"
                className="h-28 w-28 ring-4 ring-background shadow-2xl relative z-10"
              />
            ) : (
              <Avatar
                name={initials}
                size="lg"
                className="h-28 w-28 text-2xl font-bold ring-4 ring-background shadow-2xl relative z-10"
              />
            )}
          </div>
          <h3 className="text-2xl font-extrabold text-foreground">{fullName}</h3>
          {user.emailAddresses && user.emailAddresses.length > 0 && (
            <div className="flex items-center gap-2 mt-2 text-muted-foreground font-medium bg-muted/50 px-3 py-1 rounded-full text-sm">
              <Mail className="h-4 w-4" />
              <span>{email}</span>
            </div>
          )}
          {userRole && (
            <div className="mt-4 inline-flex px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest">
              {userRole}
            </div>
          )}
        </div>

        <Divider className="my-6 opacity-30" />

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 rounded-2xl bg-muted/30 border border-border/50">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm text-foreground">Status</span>
            </div>
            <span className="px-3 py-1 rounded-lg bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider">
              Active
            </span>
          </div>

          <div className="flex justify-between items-center p-4 rounded-2xl bg-muted/30 border border-border/50">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm text-foreground">Verified</span>
            </div>
            <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
              user.emailAddresses?.[0]?.verification?.status === "verified"
                ? "bg-success/10 text-success"
                : "bg-warning/10 text-warning"
            }`}>
              {user.emailAddresses?.[0]?.verification?.status === "verified" ? "Yes" : "Pending"}
            </span>
          </div>
        </div>
      </CardBody>
      <Divider className="opacity-50" />
      <CardFooter className="px-8 py-6 bg-muted/20">
        <Button
          variant="flat"
          color="danger"
          className="font-bold w-full h-12 rounded-xl"
          startContent={<LogOut className="h-4 w-4" />}
          onClick={handleSignOut}
        >
          Sign Out of Droply
        </Button>
      </CardFooter>
    </Card>
  );
}