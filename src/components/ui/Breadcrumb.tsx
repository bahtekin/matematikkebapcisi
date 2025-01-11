"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  title?: string;
  description?: string;
  instructor?: {
    name: string;
    avatar?: string;
  };
  stats?: {
    icon: React.ReactNode;
    label: string;
  }[];
}

export function Breadcrumb({ items, title, stats, instructor, description }: BreadcrumbProps) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm dark:from-blue-950/30 dark:to-indigo-950/30 dark:shadow-gray-800/10">
      {/* Arkaplan Deseni */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative px-6 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="transition-colors hover:text-primary dark:hover:text-gray-200">
            <Home className="h-4 w-4" />
          </Link>

          {items.map((item, index) => (
            <Fragment key={index}>
              <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-600" />
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
              )}
            </Fragment>
          ))}
        </nav>

        {/* Title & Description */}
        <div className="mt-4">
          {title && (
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
          )}
          {description && (
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>

        {/* Instructor & Stats */}
        {(instructor || stats) && (
          <div className="mt-4 flex flex-col gap-4 border-t border-gray-200/50 pt-4 dark:border-gray-700/50 sm:flex-row sm:items-center">
            {instructor && (
              <div className="flex items-center gap-2">
                {instructor.avatar && (
                  <img 
                    src={instructor.avatar} 
                    alt={instructor.name}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {instructor.name}
                </span>
              </div>
            )}

            {/* Stats */}
            {stats && (
              <div className="flex items-center gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    {stat.icon}
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 