"use client";

import React from 'react';
import Modal from './Modal';
import Link from 'next/link';
import Image from 'next/image';
import { X, FolderOpen } from 'lucide-react';

interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

interface SubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  categoryId: string;
  subCategories: SubCategory[];
}

export default function SubCategoryModal({
  isOpen,
  onClose,
  categoryName,
  categoryId,
  subCategories,
}: SubCategoryModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">{categoryName}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <div className={`flex space-x-4 py-2 px-1 ${subCategories.length === 1 ? 'justify-center' : 'justify-start'}`}>
            {subCategories.map((subCategory) => (
              <Link
                key={subCategory.id}
                href={`/shop?category=${categoryId}&subcategory=${subCategory.id}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 hover:border-blue-500 min-w-[180px] max-w-[250px]"
                onClick={onClose}
              >
                <div className="relative w-full h-32 sm:h-40 bg-gray-100">
                  {subCategory.imageUrl ? (
                    <Image
                      src={subCategory.imageUrl}
                      alt={subCategory.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FolderOpen className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {subCategory.name}
                  </h4>
                  {subCategory.description && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 line-clamp-2">{subCategory.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}